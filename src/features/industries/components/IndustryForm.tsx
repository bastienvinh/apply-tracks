import { z } from "zod"
import { useForm } from "@tanstack/react-form"
import { toast } from "sonner"
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldLegend, FieldSet } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { InputGroup, InputGroupAddon, InputGroupText, InputGroupTextarea } from "@/components/ui/input-group"
import { useNavigate } from "react-router"
import { industriesRoute } from "@/routes"
import { IndustriesService } from "@/services/industries"
import { useCreateIndustry } from "../hooks/use-industries-mutation"

const formSchema = z.object({
  title: z.string().min(2, "Le titre doit contenir au moins 2 caractères"),
  description: z.string().optional()
})

interface IndustryFormProps {
  className?: string
}

export function IndustryForm({ className }: IndustryFormProps) {
  const navigate = useNavigate()
  const { mutateAsync: createIndustry } = useCreateIndustry()

  const form = useForm({
    defaultValues: {
      title: "",
      description: ""
    } as z.infer<typeof formSchema>,
    validators: {
      onSubmit: formSchema
    },
    onSubmit: async ({ value }) => {
      // console.log("Creating industry:", value)
      try {
        toast.success(`Secteur d'activité créé: ${value.title}`)
        await createIndustry({ name: value.title, description: value.description ?? null })
        navigate(industriesRoute())
      } catch (error) {
        toast.error("Une erreur est survenue lors de la création du secteur d'activité.")
      }
    }
  })


  return <form onSubmit={(e) => {
    e.preventDefault()
    form.handleSubmit()
  }} className={className}>
    <FieldGroup>
      <form.Field name="title" children={(field) => {
        const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

        return <Field data-invalid={isInvalid}>
          <FieldLabel form={field.name}>Nom <span className="text-sm">(Obligatoire)</span></FieldLabel>
          <Input
            id={field.name}
            onBlur={field.handleBlur}
            onChange={(e) => field.handleChange(e.target.value)}
            aria-invalid={isInvalid}
            autoComplete="off"
          />
          {isInvalid && (<FieldError errors={field.state.meta.errors} />)}
        </Field>
      }} >
      </form.Field>

      <form.Field
        name="description"
        children={(field) => {
          const isInvalid =
            field.state.meta.isTouched && !field.state.meta.isValid
          return (
            <Field data-invalid={isInvalid}>
              <FieldLabel htmlFor={field.name}>Description</FieldLabel>
              <InputGroup>
                <InputGroupTextarea
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  rows={6}
                  className="min-h-24 resize-none"
                  aria-invalid={isInvalid}
                />
                <InputGroupAddon align="block-end">
                  <InputGroupText className="tabular-nums">
                    {field.state.value?.length ?? "0"}/100 characters
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
              <FieldDescription>
                Include steps to reproduce, expected behavior, and what
                actually happened.
              </FieldDescription>
              {isInvalid && (
                <FieldError errors={field.state.meta.errors} />
              )}
            </Field>
          )
        }}
      />
    </FieldGroup>

    <div className="flex justify-end gap-2 mt-4">
      <Button onClick={() => navigate(industriesRoute())} type="button">Retour</Button>
      <Button type="submit">Enregistrer</Button>
    </div>
  </form>
}