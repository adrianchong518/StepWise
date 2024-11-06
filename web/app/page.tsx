import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import Icon from "@/app/icon.svg"

export default function Page() {
    return (
        <main className="flex min-h-screen flex-col">
            <div className="flex items-center bg-blue-400 h-20 py-4 px-6">
                <Icon className="w-auto h-full bg-blue-100 rounded-xl" />
                <span className="text-3xl text-gray-50 p-6">StepWise</span>
            </div>
            <div className="flex items-center justify-center min-h-screen">
                <div className="flex flex-col justify-center gap-6 rounded-3xl bg-blue-100 px-6 py-10">
                    <p className={`text-xl text-gray-800 md:text-3xl md:leading-normal`}>
                        <strong>Welcome to StepWise.</strong>
                    </p>
                    <Link
                        href="/login"
                        className="flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white md:text-base hover:scale-110 hover:bg-blue-400 transition"
                    >
                        <span>Get started</span> <ArrowRightIcon className="w-5 md:w-6" />
                    </Link>
                </div>
            </div>
        </main>
    );
}
