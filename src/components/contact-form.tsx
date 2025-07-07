
"use client";

import React, { useState, useEffect, useRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { addDays, format, startOfDay } from 'date-fns';

import { Button } from "@/components/ui/button";
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
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Clock, Users } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

// --- FORM SCHEMA ---
const consultationSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().optional(),
  courseId: z.string({ required_error: "Please select a class from the calendar above." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

type ClassSchedule = {
  id: string;
  name: string;
  date: string;
  time: string;
  totalSeats: number;
  bookedSeats: number;
  reservedSeats: number;
};

export function ContactForm() {
  const { toast } = useToast();
  const formRef = useRef<HTMLDivElement>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedClass, setSelectedClass] = useState<ClassSchedule | null>(null);
  const [allClassSchedules, setAllClassSchedules] = useState<ClassSchedule[]>([]);
  const [eventDays, setEventDays] = useState<Date[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // --- MOCK DATA GENERATION (Client-side only) ---
    const courseNames = ["IELTS Intensive", "PTE Academic", "TOEFL Workshop", "IELTS General"];
    const generateMockClasses = () => {
      const classes = [];
      const today = new Date();
      for (let i = 0; i < 45; i++) { // Generate classes for the next 45 days
        const date = addDays(today, Math.floor(i / 2));
        if (date.getDay() === 0) continue; // Skip Sundays

        const courseName = courseNames[i % courseNames.length];
        const isMorning = Math.random() > 0.5;
        const totalSeats = Math.floor(Math.random() * 6) + 10; // 10-15 seats
        const bookedSeats = Math.floor(Math.random() * totalSeats);
        const reservedSeats = Math.floor(Math.random() * (totalSeats - bookedSeats));
        
        classes.push({
          id: `${courseName.replace(/\s+/g, '-').toLowerCase()}-${format(date, 'yyyy-MM-dd')}-${isMorning ? 'am' : 'pm'}`,
          name: courseName,
          date: format(date, 'yyyy-MM-dd'),
          time: isMorning ? "09:00 - 11:00" : "18:00 - 20:00",
          totalSeats,
          bookedSeats,
          reservedSeats,
        });
      }
      return [...new Map(classes.map(item => [item.id, item])).values()];
    };

    const schedules = generateMockClasses();
    setAllClassSchedules(schedules);
    setEventDays(schedules.map(cls => startOfDay(new Date(cls.date))));
    setIsLoading(false);
  }, []);

  const form = useForm<z.infer<typeof consultationSchema>>({
    resolver: zodResolver(consultationSchema),
    defaultValues: { name: "", email: "", phone: "", message: "", courseId: "" },
  });

  useEffect(() => {
    if (selectedClass) {
      form.setValue("courseId", selectedClass.id);
      form.clearErrors("courseId");
    }
  }, [selectedClass, form]);

  const handleSelectClass = (cls: ClassSchedule) => {
    setSelectedClass(cls);
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  function onSubmit(values: z.infer<typeof consultationSchema>) {
    console.log("Booking Request:", values);
    toast({ title: "Booking Request Sent!", description: "Thank you! We will contact you shortly to confirm." });
    form.reset();
    setSelectedClass(null);
  }

  const dailyClasses = allClassSchedules.filter(cls =>
    selectedDate && format(new Date(cls.date), 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd')
  );

  return (
    <div className="space-y-16">
      {/* Class Calendar Section */}
      <div>
        <h2 className="text-3xl font-bold text-center mb-8 font-heading">Class Calendar</h2>
        <Card className="shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-4 border-b md:border-b-0 md:border-r">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                fromDate={new Date()}
                toDate={addDays(new Date(), 45)}
                className="p-0"
                classNames={{
                  day_selected: "bg-primary text-primary-foreground hover:bg-primary/90 focus:bg-primary/90",
                  day: "transition-colors",
                }}
                modifiers={{
                  events: eventDays,
                }}
                modifiersClassNames={{
                  events: "font-bold text-primary",
                }}
                disabled={isLoading}
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-3 font-heading">
                {selectedDate ? `Classes for ${format(selectedDate, 'PPP')}` : 'Select a date'}
              </h3>
              <ScrollArea className="h-[300px] pr-4">
                {isLoading ? (
                  <div className="space-y-3">
                    <Skeleton className="h-[76px] w-full" />
                    <Skeleton className="h-[76px] w-full" />
                    <Skeleton className="h-[76px] w-full" />
                  </div>
                ) : selectedDate && dailyClasses.length > 0 ? (
                  <div className="space-y-3">
                    {dailyClasses.map(cls => {
                      const availableSeats = cls.totalSeats - cls.bookedSeats - cls.reservedSeats;
                      const isFull = availableSeats <= 0;
                      return (
                        <Card 
                          key={cls.id} 
                          className={cn(
                            "p-4 transition-all hover:shadow-md",
                            selectedClass?.id === cls.id && "ring-2 ring-primary"
                          )}
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-semibold">{cls.name}</h4>
                              <div className="flex items-center text-sm text-muted-foreground mt-1">
                                <Clock className="w-4 h-4 mr-1.5" />
                                {cls.time}
                              </div>
                              <div className="flex items-center text-sm text-muted-foreground">
                                <Users className="w-4 h-4 mr-1.5" />
                                {availableSeats > 0 ? `${availableSeats} seats available` : 'Class is full'}
                              </div>
                            </div>
                            <Button 
                              size="sm" 
                              onClick={() => handleSelectClass(cls)}
                              disabled={isFull}
                            >
                              {selectedClass?.id === cls.id ? 'Selected' : (isFull ? 'Full' : 'Select')}
                            </Button>
                          </div>
                        </Card>
                      );
                    })}
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full text-muted-foreground">
                    <p>{selectedDate ? 'No classes scheduled for this day.' : 'Please select a date from the calendar.'}</p>
                  </div>
                )}
              </ScrollArea>
            </div>
          </div>
        </Card>
      </div>

      {/* Booking Form Section */}
      <div ref={formRef} className="pt-8">
        <Card className="max-w-3xl mx-auto shadow-lg">
          <CardHeader>
            <CardTitle className="font-heading text-2xl">Book Your Seat</CardTitle>
            <CardDescription>
              {selectedClass
                ? `You have selected: ${selectedClass.name} on ${format(new Date(selectedClass.date), 'PPP')}. Complete the form to book.`
                : "Select a class from the calendar above to begin."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Hidden Field for courseId */}
                <FormField control={form.control} name="courseId" render={({ field }) => (
                    <FormItem className="hidden">
                        <FormControl><Input {...field} /></FormControl>
                        <FormMessage />
                    </FormItem>
                )} />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <FormField control={form.control} name="name" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl><Input placeholder="Your name" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="email" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl><Input placeholder="your.email@example.com" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>
                <FormField control={form.control} name="phone" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Phone Number (Optional)</FormLabel>
                        <FormControl><Input type="tel" placeholder="Your phone number" {...field} /></FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
                <FormField control={form.control} name="message" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Message</FormLabel>
                    <FormControl><Textarea placeholder="Ask any questions or provide additional details here..." className="resize-none" rows={4} {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <Button type="submit" className="w-full sm:w-auto" disabled={!selectedClass}>
                  Request to Book
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
