
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from '../../components/ui/use-toast';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '../ui/form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const formSchema = z.object({
  name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  email: z.string().email('Email invalide'),
  comment: z.string().min(3, 'Le commentaire doit contenir au moins 3 caractères')
});

interface CommentFormProps {
  postId: number;
  onCommentSubmit: (name: string, email: string, content: string) => Promise<boolean>;
}

const CommentForm: React.FC<CommentFormProps> = ({ postId, onCommentSubmit }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      comment: ''
    }
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    try {
      const success = await onCommentSubmit(values.name, values.email, values.comment);
      if (success) {
        form.reset();
        toast({
          title: "Commentaire soumis",
          description: "Votre commentaire a été envoyé avec succès et sera affiché après modération."
        });
      } else {
        toast({
          title: "Erreur",
          description: "Impossible d'envoyer votre commentaire. Veuillez réessayer plus tard.",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur inattendue s'est produite.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Nom</FormLabel>
              <FormControl>
                <Input placeholder="Votre nom" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="votre@email.com" {...field} />
              </FormControl>
              <FormDescription className="text-xs text-gray-400">
                Ne sera pas publié
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="comment"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Commentaire</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Votre commentaire..."
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full bg-mdh-gold hover:bg-mdh-gold/80 text-black"
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-black mr-2"></div>
              Envoi...
            </>
          ) : 'Soumettre le commentaire'}
        </Button>
      </form>
    </Form>
  );
};

export default CommentForm;
