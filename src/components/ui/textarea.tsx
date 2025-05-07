import React from "react";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    id: string;
}

export const Textarea: React.FC<TextareaProps> = ({ label, id, ...props }) => {
    return (
        <div className="space-y-1">
            {label && <label htmlFor={id} className="text-sm font-medium text-gray-700">{label}</label>}
            <textarea
                id={id}
                className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                {...props}
            />
        </div>
    );
};
