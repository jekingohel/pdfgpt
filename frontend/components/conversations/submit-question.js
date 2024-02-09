"use client"
import { Send, Loader } from "lucide-react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useParams } from "next/navigation"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"

const formSchema = z.object({
  question: z.string().min(2, {
    message: "Question must be at least 2 characters.",
  }),
})

export default function SubmitQuestion({ loading, ngn }) {
  const params = useParams()

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      question: "",
    },
  })

  const onSubmit = (values) => {
    const { file } = params
    const { question } = values
    ngn.question.add({ file_id: file, question })
    form.reset()
  }

  return (
    <div className="p-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex items-start space-x-2 w-full">
            <FormField
              control={form.control}
              name="question"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input placeholder="Ask any question..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={loading}>
              {!loading ? (
                <Send size={18} />
              ) : (
                <Loader size={18} className="animate-spin" />
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
