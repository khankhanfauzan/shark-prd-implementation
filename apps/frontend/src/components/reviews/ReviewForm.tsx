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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useCreateReview } from '@/hooks/use-product-queries';

const DESCRIPTION_MAX = 1000;
const NAME_MAX = 255;

const reviewSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Nama wajib diisi')
    .max(NAME_MAX, `Nama maksimal ${NAME_MAX} karakter`),
  rating: z
    .number()
    .int('Rating harus bilangan bulat')
    .min(1, 'Rating wajib diisi')
    .max(5, 'Rating maksimal 5'),
  description: z
    .string()
    .max(DESCRIPTION_MAX, `Deskripsi maksimal ${DESCRIPTION_MAX} karakter`)
    .optional(),
});

type ReviewFormValues = z.infer<typeof reviewSchema>;

function RequiredMark() {
  return (
    <span className="text-destructive" aria-hidden>
      {' '}
      *
    </span>
  );
}

export function ReviewForm() {
  const createReview = useCreateReview();
  const form = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewSchema),
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {
      name: '',
      rating: 0,
      description: '',
    },
  });

  async function onSubmit(values: ReviewFormValues) {
    const description = values.description?.trim();
    createReview.reset();
    try {
      await createReview.mutateAsync({
        name: values.name,
        rating: values.rating,
        ...(description ? { comment: description } : {}),
      });
      form.reset({ name: '', rating: 0, description: '' });
    } catch {
      // Error surface via createReview.isError
    }
  }

  return (
    <Form {...form}>
      <form
        id="write-review"
        noValidate
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-5 rounded-xl border bg-muted/30 p-5 scroll-mt-6"
      >
        <div className="space-y-1">
          <p className="font-serif text-lg font-semibold">Kirim ulasan</p>
          <p className="text-sm text-muted-foreground">
            Nama dan rating wajib diisi. Deskripsi bersifat opsional.
          </p>
        </div>

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Nama
                <RequiredMark />
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Nama Anda"
                  autoComplete="name"
                  maxLength={NAME_MAX}
                  aria-required="true"
                  disabled={createReview.isPending}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="rating"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>
                Rating
                <RequiredMark />
              </FormLabel>
              <FormControl>
                <StarRating
                  value={field.value}
                  size="lg"
                  invalid={fieldState.invalid}
                  disabled={createReview.isPending}
                  onChange={(value) => {
                    field.onChange(value);
                    void form.trigger('rating');
                  }}
                  onBlur={field.onBlur}
                />
              </FormControl>
              <FormDescription>
                {field.value >= 1
                  ? `${field.value} dari 5 bintang`
                  : 'Pilih 1 sampai 5 bintang'}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => {
            const length = field.value?.length ?? 0;
            return (
              <FormItem>
                <FormLabel>
                  Deskripsi
                  <span className="ml-1.5 text-xs font-normal text-muted-foreground">
                    (opsional)
                  </span>
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Ceritakan pengalaman Anda memakai produk ini"
                    maxLength={DESCRIPTION_MAX}
                    disabled={createReview.isPending}
                    {...field}
                  />
                </FormControl>
                <div className="flex items-start justify-between gap-3">
                  <FormMessage />
                  <p className="ml-auto text-[0.8rem] text-muted-foreground">
                    {length}/{DESCRIPTION_MAX}
                  </p>
                </div>
              </FormItem>
            );
          }}
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

        <Button
          type="submit"
          className="w-full sm:w-auto"
          disabled={createReview.isPending}
        >
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
