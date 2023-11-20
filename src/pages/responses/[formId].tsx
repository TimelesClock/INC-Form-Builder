// pages/forms/[formId].tsx
import DraggableQuestions from '../../components/DraggableQuestions';

import { useForm } from "react-hook-form"
import * as z from "zod"
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import StaticForm from '~/components/StaticForm';
import { api } from '~/utils/api';

import type { Question } from '~/components/StaticForm';
import type { Answer } from '~/components/StaticForm';
import type { User } from '@prisma/client'
import Section from '~/components/Section';


const FormPage = () => {
    const router = useRouter();
    const { data: form } = api.form.getForm.useQuery({ id: router.query.formId as string }, { enabled: !!router.query.formId });
    const { data: answerData } = api.answer.getUserAnswers.useQuery({ id: router.query.formId as string }, { enabled: !!router.query.formId });
    const { data: userData } = api.answer.getAnsweredUsers.useQuery({ id: router.query.formId as string }, { enabled: !!router.query.formId })

    const [questions, setQuestions] = useState<Question[]>([]);
    const [answers, setAnswers] = useState<Answer[]>([]);
    const [users, setUsers] = useState<User[]>([]);



    useEffect(() => {
        if (form) {
            setQuestions(form.question as unknown as Question[]);
        }
    }, [form])

    useEffect(() => {
        if (userData) {
            setUsers(userData as unknown as User[]);
        }
    }, [userData])

    const handleSelectUser = (event: React.ChangeEvent<HTMLSelectElement>) => {

        let answer = answerData?.find((answer) => answer.user.id === event.currentTarget.value)
        if (answer) {
            setAnswers(answer.content as unknown as Answer[])
        }
        
    }
    return (
        <>
            
            <button onClick={() => router.push("/edit/" + router.query.formId)} className="bg-blue-500 text-white p-2 rounded">
                Back
            </button>
            <div className="container mx-auto p-4">
                Select the user to view their responses:
                <select defaultValue="" onChange={handleSelectUser} className="my-5 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm rounded-md">
                    <option value="" disabled>Select a user</option>
                    {users?.map((user, index) => {
                        return (
                            <>
                                <option key={user.id} value={user.id}>{user.email}</option>
                            </>
                        )
                    })}
                </select>
                <h1 className="text-xl font-bold mb-4">Form Questions</h1>
                {questions.map((question, index) => {
                    let answer = answers?.find((answer) => answer.id === question.id);
                    let content
                    if (answer && answer.content) {
                        content = answer.content
                    }
                    

                    return (
                        <Section key={index} question={question as Question} answer={content} editMode={true} />
                    )
                }
                )}
            </div>

        </>
    );
};

export default FormPage;
