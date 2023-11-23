import React from 'react';

import Section from './sections/Section';
import type { JsonArray, JsonObject } from '@prisma/client/runtime/library';

import { api } from '~/utils/api';
import uploadToS3 from '~/utils/s3Upload';
import deleteFromS3 from '~/utils/s3Delete';

import { useRouter } from 'next/router';
import toast from 'react-hot-toast';



export interface Question {
    id: string;
    text: string;
    type: string;
    options?: Option[];
    required?: boolean;
}

export interface Option {
    id: string;
    content: string;
}

export interface Answer {
    id: string;
    content: string | string[];
}

interface StaticFormProps {
    questions: Question[];
    answers?: Answer[];
}

const StaticForm: React.FC<StaticFormProps> = ({ questions, answers }) => {
    const util = api.useUtils();
    const router = useRouter()

    const { mutate: addAnswer } = api.answer.addAnswer.useMutation();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // Initialize an object to hold the parsed form data
        const jsonData: JsonObject = {};

        // Process each form element
        for (const element of event.currentTarget.elements) {
            const input = element as HTMLInputElement;

            if (input.nodeName !== "INPUT" && input.nodeName !== "TEXTAREA" && input.nodeName !== "SELECT") {
                continue;
            }
            //if the input id starts with checkbox continue
            if (input.id.startsWith("checkbox")) {
                continue
            }
            // Check if the element is a checkbox
            if (input.type === "checkbox") {
                if (!jsonData[input.name]) {
                    jsonData[input.name] = [] as JsonArray;
                }
                if (input.checked) {
                    const valueArr = jsonData[input.name] as JsonArray;
                    valueArr.push(input.value);
                    jsonData[input.name] = valueArr;
                }
            }
            // Check if the element is a radio button
            else if (input.type === "radio") {
                if (input.checked) {
                    jsonData[input.name] = input.value;
                }
            }
            // Check if the element is a file
            else if (input.type === "file") {
                const file = input.files?.[0];
                if (file) {
                    const fileName = file.name;
                    const folderName = router.query.formId as string;
                    const mimeType = file.type; // MIME type of the file

                    // Convert file to a buffer
                    const readFileAsBuffer = (file:File) => {
                        return new Promise((resolve, reject) => {
                            const reader = new FileReader();
                            reader.onload = () => {
                                const result = reader.result;
                                if (result instanceof ArrayBuffer) {
                                    resolve(Buffer.from(result));
                                } else {
                                    reject(new Error("Failed to read file as ArrayBuffer"));
                                }
                            };
                            reader.onerror = () => reject(reader.error);
                            reader.readAsArrayBuffer(file);
                        });
                    };
                    

                    try {
                        const fileBuffer = await readFileAsBuffer(file);

                        //First delete the old file
                        const oldFileUrl = document.getElementById("file"+input.id)?.innerHTML
                        if(oldFileUrl){
                            await deleteFromS3(oldFileUrl)
                        }

                        const fileUrl = await uploadToS3(
                            process.env.NEXT_PUBLIC_AWS_BUCKET_NAME!,
                            `${folderName}/${input.id}/${fileName}`,
                            fileBuffer as Buffer,
                            mimeType,
                            fileName
                        );
                        
                        jsonData[input.name] = fileUrl;
                        
                    } catch (error) {
                        console.error('Error reading file:', error);
                        toast.error("Error uploading file")
                        return
                    }
                }else{
                    //get the file url from the span
                    const fileUrl = document.getElementById("file"+input.id)?.innerHTML
                    if(fileUrl){
                        jsonData[input.name] = fileUrl
                    }
                }


            }
            // Handle other input types
            else {
                jsonData[input.name] = input.value;
            }
        }

        // Format the jsonData into {id:string, content:string | string[]}[]
        const answers = [];
        for (const key in jsonData) {
            answers.push({ id: key, content: jsonData[key] as string[] | string });
        }

        // Add the answers to the database
        const formId = router.query.formId as string;

        addAnswer({ id: formId, answer: answers }, {
            onSuccess: () => {
                void util.answer.getAnswers.refetch({ id: formId });
                toast.success("Response saved!")
                void router.push("/")
            }
        });
    };


    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="border border-black p-4 my-2 grid">
                    {questions.map((question, index) => {
                        const answer = answers?.find((answer) => answer.id === question.id);
                        let content
                        if (answer?.content) {
                            content = answer.content
                        }

                        return (
                            <Section key={index} question={question} answer={content} />
                        )
                    })}

                </div>
                <button
                    type="submit"
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Save
                </button>
            </form>
        </>
    );
}

export default StaticForm;