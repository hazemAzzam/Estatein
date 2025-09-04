"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/SliderSection";
import { Combobox } from "@/components/ui/ComboBox";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const locationOptions = [
  { value: "cairo", label: "Cairo" },
  { value: "giza", label: "Giza" },
  { value: "alex", label: "Alexandria" },
];

const typeOptions = [
  { value: "apartment", label: "Apartment" },
  { value: "villa", label: "Villa" },
  { value: "studio", label: "Studio" },
];

const numberOptions = [
  { value: "1", label: "1" },
  { value: "2", label: "2" },
  { value: "3", label: "3" },
];

const budgetOptions = [
  { value: "100k", label: "$100k" },
  { value: "200k", label: "$200k" },
  { value: "500k", label: "$500k" },
];

const FormSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters."),
  lastName: z.string().min(2, "Last name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email."),
  phone: z.string().min(6, "Please enter a valid phone number."),
  preferredLocation: z.string().min(1, "Required."),
  preferredType: z.string().min(1, "Required."),
  numberOfBathrooms: z.string().min(1, "Required."),
  numberOfBedrooms: z.string().min(1, "Required."),
  budget: z.string().min(1, "Required."),
  message: z.string().optional(),
  terms: z.boolean().refine((val) => val === true, {
    message: "You must accept terms",
  }),
});

export default function PropertyForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      preferredLocation: "",
      preferredType: "",
      numberOfBathrooms: "",
      numberOfBedrooms: "",
      budget: "",
      message: "",
      terms: false,
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast("The form is submitted successfully!");
  }

  return (
    <Container>
      <Section
        title="Let's Make it Happen"
        description="Ready to take the first step toward your dream property? Fill out the form below, and our real estate wizards will work their magic to find your perfect match. Don't wait; let's embark on this exciting journey together."
      >
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-6 md:gap-10 w-full border border-gray-15 rounded-md p-4 sm:p-6 md:p-10"
          >
            <div className="flex flex-col sm:flex-row gap-4 md:gap-6 lg:gap-10 w-full">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem className="flex-1 min-w-0">
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter First Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem className="flex-1 min-w-0">
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Last Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="flex-1 min-w-0">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter Your Email"
                        {...field}
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
                  <FormItem className="flex-1 min-w-0">
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input
                        type="tel"
                        placeholder="Enter Phone Number"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 md:gap-6 lg:gap-10 w-full">
              <FormField
                control={form.control}
                name="preferredLocation"
                render={({ field }) => (
                  <FormItem className="flex-1 min-w-0">
                    <FormLabel>Preferred Location</FormLabel>
                    <FormControl>
                      <Combobox
                        value={field.value}
                        onChange={field.onChange}
                        options={locationOptions}
                        placeholder="Choose a location"
                        className="w-full min-w-0"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="preferredType"
                render={({ field }) => (
                  <FormItem className="flex-1 min-w-0">
                    <FormLabel>Preferred Type</FormLabel>
                    <FormControl>
                      <Combobox
                        value={field.value}
                        onChange={field.onChange}
                        options={typeOptions}
                        placeholder="Choose property type"
                        className="w-full min-w-0"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 md:gap-6 lg:gap-10 w-full">
              <FormField
                control={form.control}
                name="numberOfBathrooms"
                render={({ field }) => (
                  <FormItem className="flex-1 min-w-0">
                    <FormLabel>No. of Bathrooms</FormLabel>
                    <FormControl>
                      <Combobox
                        value={field.value}
                        onChange={field.onChange}
                        options={numberOptions}
                        placeholder="Bathrooms"
                        className="w-full min-w-0"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="numberOfBedrooms"
                render={({ field }) => (
                  <FormItem className="flex-1 min-w-0">
                    <FormLabel>No. of Bedrooms</FormLabel>
                    <FormControl>
                      <Combobox
                        value={field.value}
                        onChange={field.onChange}
                        options={numberOptions}
                        placeholder="Bedrooms"
                        className="w-full min-w-0"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="budget"
                render={({ field }) => (
                  <FormItem className="flex-1 min-w-0">
                    <FormLabel>Budget</FormLabel>
                    <FormControl>
                      <Combobox
                        value={field.value}
                        onChange={field.onChange}
                        options={budgetOptions}
                        placeholder="Select budget"
                        className="w-full min-w-0"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter your message here..."
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-col sm:flex-row gap-4 md:gap-6 lg:gap-10 w-full justify-between p-2">
              <FormField
                control={form.control}
                name="terms"
                render={({ field }) => (
                  <FormItem className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
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
                Send Your Message
              </Button>
            </div>
          </form>
        </Form>
      </Section>
    </Container>
  );
}
