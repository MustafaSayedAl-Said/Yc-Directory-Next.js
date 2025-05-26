"use client";

import React, { useState } from 'react'
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import dynamic from 'next/dynamic';
import { PlayCircle, Send } from 'lucide-react';
import { Button } from './ui/button';
import { useActionState } from 'react';
import { formSchema } from '@/lib/validation';
import { z } from 'zod';
import { toast } from "sonner"
import { useRouter } from 'next/navigation';
import { route } from 'sanity/router';
import { createPitch } from '@/lib/actions';



const MarkdownEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false });



const StartupForm = () => {
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [pitch, setPitch] = useState("Hello World");
    const router = useRouter();
    const handleFormSubmit = async (prevState: any, formData: FormData) => {
        try {
            const formValues = {
                title: formData.get('title') as string,
                description: formData.get('description') as string,
                category: formData.get('category') as string,
                link: formData.get('link') as string,
                pitch,
            }
            await formSchema.parseAsync(formValues);

            console.log('Form values:', formValues);

            const result = await createPitch(prevState, formData, pitch);

            if (result.status == 'SUCCESS') {
                toast.success("スタートアップが正常に作成されました。", {
                    description: "スタートアップが作成され、プラットフォーム上で公開されました。",
                });
                router.push(`/startup/${result._id}`);
            }
            return result;
        } catch (error) {
            if (error instanceof z.ZodError) {
                const fieldErrors = error.flatten().fieldErrors;
                setErrors(fieldErrors as unknown as Record<string, string>);

                toast.error("検証エラー", {
                    description: "すべてのフィールドが正しく入力されていることを確認してください。",
                    // style: {
                    //     backgroundColor: "#9a0200", // red
                    //     color: "white",
                    // },
                });

                return { ...prevState, error: "Validation error", status: "ERROR" };
            } else {
                toast.error("サーバーエラー", {
                    description: "リクエストの処理中にエラーが発生しました。しばらくしてからもう一度お試しください。",
                    // style: {
                    //     backgroundColor: "#9a0200", // red
                    //     color: "white",
                    // },
                });
                return { ...prevState, error: "Unexpected error", status: "ERROR" };
            }
        }
    };
    const [state, formAction, isPending] = useActionState(
        handleFormSubmit,
        {
            error: '',
            status: 'INITIAL'
        });

    return (
        <form action={formAction} className='startup-form'>
            <div>
                <label htmlFor="title" className='startup-form_label'>
                    Title
                    <Input id='title'
                        name='title'
                        className='startup-form_input'
                        required
                        placeholder='スタートアップタイトル'
                    />
                    {errors.title && <p className='startup-form_error'>{errors.title}</p>}
                </label>
            </div>

            <div>
                <label htmlFor="Description" className='startup-form_label'>
                    Description
                    <Textarea id='description'
                        name='description'
                        className='startup-form_textarea'
                        required
                        placeholder='スタートアップの説明'
                    />
                    {errors.description && <p className='startup-form_error'>{errors.description}</p>}
                </label>
            </div>

            <div>
                <label htmlFor="category" className='startup-form_label'>
                    Category
                    <Input id='category'
                        name='category'
                        className='startup-form_input'
                        required
                        placeholder='スタートアップ部門（テクノロジー、健康、教育など'
                    />
                    {errors.category && <p className='startup-form_error'>{errors.category}</p>}
                </label>
            </div>

            <div>
                <label htmlFor="link" className='startup-form_label'>
                    Image URL
                    <Input id='link'
                        name='link'
                        className='startup-form_input'
                        required
                        placeholder='Startup Image URL'
                    />
                    {errors.link && <p className='startup-form_error'>{errors.link}</p>}
                </label>
            </div>

            <div data-color-mode="light">
                <label htmlFor="pitch" className='startup-form_label'>
                    Pitch
                    <MarkdownEditor
                        value={pitch}
                        onChange={(value?: string) => setPitch(value ?? "")}
                        id="pitch"
                        preview='edit'
                        height={300}
                        style={{ borderRadius: 20, overflow: "hidden" }}
                        textareaProps={{
                            placeholder:
                                "あなたのスタートアップについて、それがどんな問題を解決するのか、そしてそれがなぜユニークなのかを簡単に説明してください。",
                        }}
                        previewOptions={{ disallowedElements: ['style'], }}
                    />
                    {errors.pitch && <p className='startup-form_error'>{errors.pitch}</p>}
                </label>
            </div>

            <Button type='submit' className='startup-form_btn text-white'
                disabled={isPending}
            >
                {isPending ? 'Submitting...' : 'Submit'}
                <Send className='size-6 ml-2' />
            </Button>


        </form>
    )
}

export default StartupForm
