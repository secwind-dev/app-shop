import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useForm } from "@tanstack/react-form"
import { zodValidator } from "@tanstack/zod-form-adapter"
import { FaUser, FaEnvelope, FaPhone } from "react-icons/fa"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().min(10, {
    message: "Phone number must be at least 10 digits.",
  }),
  age: z.coerce.number().min(18, {
    message: "You must be at least 18 years old.",
  }).max(120, {
    message: "Age must be less than 120.",
  }),
})

export function FormExample() {
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      age: 18,
    } as z.infer<typeof formSchema>,
    onSubmit: async ({ value }) => {
      console.log(value)
      alert(`Form submitted successfully!\n\nName: ${value.name}\nEmail: ${value.email}\nPhone: ${value.phone}\nAge: ${value.age}`)
    },
    validatorAdapter: zodValidator,
    validators: {
      onChange: formSchema,
    },
  })


  return (
    <div className="w-full max-w-3xl mx-auto space-y-8">
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-3">
          Interactive Form Demo
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Experience our form system built with shadcn-ui, @tanstack/react-form, and zod validation. 
          Clean design meets powerful functionality.
        </p>
      </div>

      <div className="bg-secondary/30 rounded-2xl p-8 border border-border">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            e.stopPropagation()
            form.handleSubmit()
          }}
          className="space-y-8"
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <form.Field
                name="name"
                children={(field) => (
                  <div className="space-y-2">
                    <Label className="flex items-center gap-3 text-base font-medium text-foreground">
                      <FaUser className="h-4 w-4 text-muted-foreground" />
                      Full Name
                    </Label>
                    <Input
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Enter your full name"
                    />
                    <p className="text-sm text-muted-foreground">
                      This is your public display name.
                    </p>
                    {field.state.meta.touchedErrors ? (
                      <p className="text-sm text-destructive">
                        {field.state.meta.touchedErrors}
                      </p>
                    ) : null}
                  </div>
                )}
              />

              <form.Field
                name="email"
                children={(field) => (
                  <div className="space-y-2">
                    <Label className="flex items-center gap-3 text-base font-medium text-foreground">
                      <FaEnvelope className="h-4 w-4 text-muted-foreground" />
                      Email Address
                    </Label>
                    <Input
                      name={field.name}
                      type="email"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Enter your email address"
                    />
                    <p className="text-sm text-muted-foreground">
                      We'll use this email to contact you.
                    </p>
                    {field.state.meta.touchedErrors ? (
                      <p className="text-sm text-destructive">
                        {field.state.meta.touchedErrors}
                      </p>
                    ) : null}
                  </div>
                )}
              />

              <form.Field
                name="phone"
                children={(field) => (
                  <div className="space-y-2">
                    <Label className="flex items-center gap-3 text-base font-medium text-foreground">
                      <FaPhone className="h-4 w-4 text-muted-foreground" />
                      Phone Number
                    </Label>
                    <Input
                      name={field.name}
                      type="tel"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Enter your phone number"
                    />
                    <p className="text-sm text-muted-foreground">
                      Your phone number for verification purposes.
                    </p>
                    {field.state.meta.touchedErrors ? (
                      <p className="text-sm text-destructive">
                        {field.state.meta.touchedErrors}
                      </p>
                    ) : null}
                  </div>
                )}
              />

              <form.Field
                name="age"
                children={(field) => (
                  <div className="space-y-2">
                    <Label className="text-base font-medium text-foreground">Age</Label>
                    <Input
                      name={field.name}
                      type="number"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(parseInt(e.target.value) || 18)}
                      placeholder="Enter your age"
                    />
                    <p className="text-sm text-muted-foreground">
                      You must be at least 18 years old to register.
                    </p>
                    {field.state.meta.touchedErrors ? (
                      <p className="text-sm text-destructive">
                        {field.state.meta.touchedErrors}
                      </p>
                    ) : null}
                  </div>
                )}
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Button type="submit" size="lg" className="flex-1 text-base">
                Submit Form
              </Button>
              <Button
                type="button"
                variant="outline"
                size="lg"
                onClick={() => form.reset()}
                className="flex-1 text-base"
              >
                Reset Form
              </Button>
            </div>
        </form>
      </div>

      <div className="mt-8 p-6 bg-secondary/50 rounded-xl border border-border">
        <h3 className="font-semibold text-foreground mb-3">Live Form State</h3>
        <div className="bg-background rounded-lg p-4 border border-border">
          <pre className="text-sm text-muted-foreground overflow-x-auto">
            {JSON.stringify(form.state.values, null, 2)}
          </pre>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Watch how the form state updates as you type
        </p>
      </div>
    </div>
  )
}