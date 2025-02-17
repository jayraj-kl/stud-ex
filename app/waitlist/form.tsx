"use client";

import type React from "react";
import { useRef, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useActionState } from "react";
import type * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Vortex } from "@/components/ui/vortex";
import { submitWaitlistForm } from "./action";
import { formSchema } from "./schema";
import { motion } from "framer-motion";

type FormValues = z.infer<typeof formSchema>;

export function WaitlistForm() {
  const [state, formAction] = useActionState(submitWaitlistForm, {
    message: "",
  });

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    startTransition(() => {
      formAction(new FormData(formRef.current!));
      form.reset();
    });
  };

  const formRef = useRef<HTMLFormElement>(null);
  const [isPending, startTransition] = useTransition();

  return (
    <div className="w-screen h-screen overflow-hidden">
      <Vortex
        backgroundColor="black"
        className="flex items-center flex-col justify-center px-4 md:px-10 py-4 w-full h-full"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-md w-full mx-auto space-y-8 bg-black bg-opacity-50 p-8 rounded-2xl backdrop-blur-md"
        >
          <div className="space-y-4 text-center">
            <h2 className="text-white text-4xl md:text-6xl font-bold tracking-tight">
              Join the Waitlist
            </h2>
            <p className="text-gray-300 text-lg md:text-xl font-light">
              Be the first to experience our chemical burn revolution.
            </p>
            {state.message && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-block px-4 py-2 rounded-full text-sm font-medium bg-green-500 text-white shadow-lg"
              >
                {state.message}
              </motion.div>
            )}
          </div>

          <Form {...form}>
            <form
              ref={formRef}
              action={formAction}
              onSubmit={onSubmit}
              className="space-y-6"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        {...field}
                        className="bg-white bg-opacity-10 text-white placeholder-gray-400 border-0 h-14 text-lg rounded-full px-6 focus:ring-2 focus:ring-blue-500 transition duration-300"
                      />
                    </FormControl>
                    <FormMessage className="text-red-400 mt-2 text-sm" />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition duration-300 rounded-full shadow-lg"
                disabled={isPending}
              >
                {isPending ? "Sending..." : "Join the Revolution"}
              </Button>
            </form>
          </Form>
        </motion.div>
      </Vortex>
    </div>
  );
}
