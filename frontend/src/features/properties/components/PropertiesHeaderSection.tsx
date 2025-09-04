// "use client";

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import SearchField from "@/components/ui/SearchField";
import SelectField from "@/components/ui/SelectField";
import {
  Building2Icon,
  CalendarIcon,
  DollarSignIcon,
  MapPinIcon,
  SquareIcon,
  XIcon,
} from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const searchFormSchema = z.object({
  searchQuery: z.string().optional(),
  location: z.string().optional(),
  propertyType: z.string().optional(),
  priceRange: z.string().optional(),
  propertySize: z.string().optional(),
  buildYear: z.string().optional(),
});

type SearchFormValues = z.infer<typeof searchFormSchema>;

export default function PropertiesHeaderSection() {
  const form = useForm<SearchFormValues>({
    resolver: zodResolver(searchFormSchema),
    defaultValues: {
      searchQuery: "",
      location: "",
      propertyType: "",
      priceRange: "",
      propertySize: "",
      buildYear: "",
    },
  });

  const onSubmit = (data: SearchFormValues) => {
    console.log("Search form submitted:", data);
    toast.success("Search form submitted", {
      description: `Query: ${data.searchQuery}, Location: ${data.location}, Property Type: ${data.propertyType}, Price Range: ${data.priceRange}, Property Size: ${data.propertySize}, Build Year: ${data.buildYear}`,
    });
    // router.push(`/properties?${new URLSearchParams(data).toString()}`);
  };

  return (
    <div
      className=" 
        flex flex-col  justify-center gap-5
        w-full h-fit"
    >
      <div
        className="
          mx-auto flex flex-col
          justify-center items-center h-full gap-2 
          [background:linear-gradient(150deg,#262626_0%,transparent_30%)] 
          w-full min-h-[250px]
          border-b-1 border-gray-15"
      >
        <div className="container h-full flex flex-col gap-2">
          <h2 className="md:text-4xl text-2xl">Find Your Dream Property</h2>
          <p className="text-gray-60 text-sm">
            Welcome to Estatein, where your dream property awaits in every
            corner of our beautiful world. Explore our curated selection of
            properties, each offering a unique story and a chance to redefine
            your life. With categories to suit every dreamer, your journey{" "}
          </p>
        </div>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="relative container  px-5 md:-my-15!  flex flex-col gap-5 md:gap-0 items-center"
        >
          <div
            className={`flex-grow flex-wrap w-full max-w-[1200px] min-h-[50px] flex flex-row bg-gray-10 p-2  gap-2 rounded-xl md:rounded-t-xl md:rounded-b-none`}
          >
            <FormField
              control={form.control}
              name="searchQuery"
              render={({ field }) => (
                <FormItem className="min-w-[300px] flex-1">
                  <FormControl className="w-full">
                    <Input
                      placeholder="Search For A Property"
                      type="text"
                      className="h-[50px]"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="flex flex-row gap-2 flex-shrink-0 ">
              <Button type="submit" className="h-[50px] flex-1">
                Find Property
              </Button>
              <Button
                type="button"
                variant="outline"
                className="h-[50px]"
                onClick={() => form.reset()}
              >
                Clear
              </Button>
            </div>
          </div>
          <div
            className={`flex-grow w-full max-w-[1400px] min-h-[50px] flex flex-row flex-wrap bg-gray-10 p-2  gap-5 rounded-xl`}
          >
            {/* Filters */}
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <SelectField
                      icon={<MapPinIcon className="size-4" />}
                      placeholder="Location"
                      {...field}
                      options={[
                        { value: "cairo", label: "Cairo" },
                        { value: "giza", label: "Giza" },
                        { value: "alex", label: "Alexandria" },
                      ]}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="propertyType"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <SelectField
                      icon={<Building2Icon className="size-4" />}
                      placeholder="Property Type"
                      {...field}
                      options={[
                        { value: "apartment", label: "Apartment" },
                        { value: "villa", label: "Villa" },
                        { value: "studio", label: "Studio" },
                      ]}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="propertySize"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <SelectField
                      icon={<DollarSignIcon className="size-4" />}
                      placeholder="Price Range"
                      {...field}
                      options={[
                        { value: "100k", label: "$100k" },
                        { value: "200k", label: "$200k" },
                        { value: "500k", label: "$500k" },
                      ]}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="propertySize"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <SelectField
                      icon={<SquareIcon className="size-4" />}
                      placeholder="Property Size"
                      className="flex-1"
                      {...field}
                      options={[
                        { value: "small", label: "Small" },
                        { value: "medium", label: "Medium" },
                        { value: "large", label: "Large" },
                      ]}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="buildYear"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <SelectField
                      icon={<CalendarIcon className="size-4" />}
                      placeholder="Build Year"
                      {...field}
                      options={[
                        { value: "2020", label: "2020" },
                        { value: "2021", label: "2021" },
                        { value: "2022", label: "2022" },
                        { value: "2023", label: "2023" },
                      ]}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>
    </div>
  );
}
