// pages/forms/[formId].tsx

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import StaticForm from '~/components/StaticForm';
import { api } from '~/utils/api';

import type { Question } from '~/components/StaticForm';
import type { Answer } from '~/components/StaticForm';

const FormPage = () => {
    const router = useRouter();
    const { data: form } = api.form.getForm.useQuery({ id: router.query.formId as string }, { enabled: !!router.query.formId });
    
    const { data: answer } = api.answer.getAnswers.useQuery({ id: router.query.formId as string }, { enabled: !!router.query.formId });

    const [questions, setQuestions] = useState<Question[]>([]);
    const [answers, setAnswers] = useState<Answer[]>([]);

    useEffect(() => {
        if (form) {
            setQuestions(form.question as unknown as Question[]);
        }
    }, [form])
    

    useEffect(() => {
        if (answer) {
            setAnswers(answer as unknown as Answer[]);
        }
    }, [answer])
    return (
        <>
            <div className="bg-white px-6 py-12 sm:py-16 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">{form?.title}</h2>
                    <p className="mt-6 text-lg leading-8 text-gray-600">
                        {form?.description}
                    </p>
                </div>
            </div>
            <div className="container mx-auto p-4">
                <h1 className="text-xl font-bold mb-4">Form Questions</h1>
                <StaticForm questions={questions} answers={answers} />

            </div>

        </>
    );
};

export default FormPage;
