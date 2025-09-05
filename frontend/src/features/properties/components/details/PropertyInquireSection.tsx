"use client";

import Section from "@/components/ui/SliderSection";
import React from "react";
import { PropertyType } from "../../types";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod/v3";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { LocationEditIcon, MapPinIcon } from "lucide-react";

const FormSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(1, "Phone number is required"),
  selectedProperty: z.string().min(1, "Property is required"),
  message: z.string().min(1, "Message is required"),
  terms: z.boolean().refine((val) => val === true, {
    message: "You must accept terms",
  }),
});

export default function PropertyInquireSection({
  property,
}: {
  property: PropertyType;
}) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      selectedProperty: `${property.title}, ${property.location}`,
      message: "",
      terms: false,
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast.success("Inquiry submitted successfully");
  }

  return (
    <Section
      layout="row"
      title={`Inquire About ${property.title}`}
      description="Interested in this property? Fill out the form below, and our real estate experts will get back to you with more details, including scheduling a viewing and answering any questions you may have."
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="border border-gray-15 rounded-md p-4 flex-shrink-0 flex-1 min-w-[200px] h-fit flex flex-col gap-5"
        >
          <div className="flex flex-row gap-4 w-full flex-wrap">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter First Name"
                      type="text"
                      className="h-[50px] min-w-[200px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter Last Name"
                      type="text"
                      className="h-[50px] min-w-[200px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-row gap-4 w-full flex-wrap">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter Email"
                      type="email"
                      className="h-[50px] min-w-[200px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter Phone"
                      type="tel"
                      className="h-[50px] min-w-[200px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-row gap-4 w-full flex-wrap">
            <FormField
              control={form.control}
              name="selectedProperty"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Selected Property</FormLabel>
                  <FormControl>
                    <div className="relative flex flex-row items-center gap-2">
                      <Input
                        {...field}
                        placeholder="Enter Selected Property"
                        type="text"
                        className="h-[50px] min-w-[200px]"
                      />
                      <MapPinIcon className="absolute right-2" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-row gap-4 w-full flex-wrap">
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Enter Message"
                      className="h-[120px] min-w-[200px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-row gap-4 w-full flex-wrap justify-between items-center">
            <FormField
              control={form.control}
              name="terms"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel className="text-pretty flex-1 max-w-full text-sm sm:text-base">
                    I agree with Terms of Use and Privacy Policy
                  </FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="bg-purple-60 hover:bg-purple-65 text-white w-full sm:w-auto"
            >
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </Section>
  );
}
