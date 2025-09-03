import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Container from "@/ui/Container";
import React from "react";

export default async function PropertyDetails(
  props: PageProps<"/properties/[id]">
) {
  const { id } = await props.params;

  return (
    <Container>
      <h1>Property Details for ID: {id}</h1>
    </Container>
  );
}
