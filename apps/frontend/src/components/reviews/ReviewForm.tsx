'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { StarRating } from '@/components/reviews/StarRating';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useCreateReview } from '@/hooks/use-product-queries';

const reviewSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Nama wajib diisi')
    .max(255, 'Nama maksimal 255 karakter'),
  rating: z
    .number()
    .int('Rating harus bilangan bulat')
    .min(1, 'Pilih rating 1–5')
    .max(5, 'Rating maksimal 5'),
  comment: z.string().max(1000, 'Komentar maksimal 1000 karakter').optional(),
});

type ReviewFormValues = z.infer<typeof reviewSchema>;

export function ReviewForm() {
  const createReview = useCreateReview();
  const form = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      name: '',
      rating: 0,
      comment: '',
    },
  });

  async function onSubmit(values: ReviewFormValues) {
    const comment = values.comment?.trim();
    try {
      await createReview.mutateAsync({
        name: values.name,
        rating: values.rating,
        ...(comment ? { comment } : {}),
      });
      form.reset({ name: '', rating: 0, comment: '' });
    } catch {
      // Error surface via createReview.isError
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 rounded-lg border border-dashed border-border bg-background/60 p-4"
      >
        <div>
          <p className="font-serif text-lg font-semibold">Tulis ulasan</p>
          <p className="text-sm text-muted-foreground">
            Nama dan rating wajib. Komentar opsional.
          </p>
        </div>

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nama</FormLabel>
              <FormControl>
                <Input placeholder="Nama Anda" autoComplete="name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="rating"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rating</FormLabel>
              <FormControl>
                <div>
                  <StarRating
                    value={field.value}
                    onChange={field.onChange}
                    disabled={createReview.isPending}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="comment"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Komentar (opsional)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Bagaimana pengalaman Anda?"
                  maxLength={1000}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {createReview.isError ? (
          <p className="text-sm text-destructive" role="alert">
            {createReview.error.message}
          </p>
        ) : null}

        {createReview.isSuccess ? (
          <p className="text-sm text-primary" role="status">
            Ulasan berhasil dikirim.
          </p>
        ) : null}

        <Button type="submit" disabled={createReview.isPending}>
          {createReview.isPending ? (
            <>
              <Loader2 className="animate-spin" />
              Mengirim…
            </>
          ) : (
            'Kirim ulasan'
          )}
        </Button>
      </form>
    </Form>
  );
}
