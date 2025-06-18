import React from 'react'
import { Button } from '@/components/ui/button'
import { logFirebaseStatus } from '@/utils/firebase-status'
import { testFirebaseConnection } from '@/utils/test-firebase'

export function FirebaseTest() {
  const [testResult, setTestResult] = React.useState<string>('')

  const runConnectivityTest = async () => {
    setTestResult('Testing...')
    
    try {
      const isConnected = await testFirebaseConnection()
      setTestResult(isConnected ? '✅ Firebase connection successful!' : '❌ Firebase connection failed')
    } catch (error) {
      setTestResult(`❌ Test failed: ${error}`)
    }
  }

  return (
    <div className="border border-yellow-500 bg-yellow-50 p-4 rounded-lg mb-4">
      <h3 className="font-bold text-yellow-800 mb-2">🧪 Firebase Debug Tools</h3>
      <div className="space-y-2">
        <Button 
          onClick={() => logFirebaseStatus()} 
          variant="outline" 
          size="sm"
          className="mr-2"
        >
          Check Status
        </Button>
        <Button 
          onClick={runConnectivityTest} 
          variant="outline" 
          size="sm"
        >
          Test Connection
        </Button>
        {testResult && (
          <p className="text-sm font-mono mt-2">{testResult}</p>
        )}
      </div>
      <p className="text-xs text-yellow-700 mt-2">
        Remove this component before production
      </p>
    </div>
  )
}