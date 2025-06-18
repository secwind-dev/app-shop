import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
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
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      age: 18,
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    alert(`Form submitted successfully!\n\nName: ${values.name}\nEmail: ${values.email}\nPhone: ${values.phone}\nAge: ${values.age}`)
  }

  return (
    <div className="w-full max-w-3xl mx-auto space-y-8">
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-3">
          Interactive Form Demo
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Experience our form system built with shadcn-ui, react-hook-form, and zod validation. 
          Clean design meets powerful functionality.
        </p>
      </div>

      <div className="bg-secondary/30 rounded-2xl p-8 border border-border">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-3 text-base font-medium text-foreground">
                      <FaUser className="h-4 w-4 text-muted-foreground" />
                      Full Name
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your full name" {...field} />
                    </FormControl>
                    <FormDescription className="text-sm">
                      This is your public display name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-3 text-base font-medium text-foreground">
                      <FaEnvelope className="h-4 w-4 text-muted-foreground" />
                      Email Address
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter your email address"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="text-sm">
                      We'll use this email to contact you.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-3 text-base font-medium text-foreground">
                      <FaPhone className="h-4 w-4 text-muted-foreground" />
                      Phone Number
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="tel"
                        placeholder="Enter your phone number"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="text-sm">
                      Your phone number for verification purposes.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-medium text-foreground">Age</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter your age"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="text-sm">
                      You must be at least 18 years old to register.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
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
        </Form>
      </div>

      <div className="mt-8 p-6 bg-secondary/50 rounded-xl border border-border">
        <h3 className="font-semibold text-foreground mb-3">Live Form State</h3>
        <div className="bg-background rounded-lg p-4 border border-border">
          <pre className="text-sm text-muted-foreground overflow-x-auto">
            {JSON.stringify(form.watch(), null, 2)}
          </pre>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Watch how the form state updates as you type
        </p>
      </div>
    </div>
  )
}