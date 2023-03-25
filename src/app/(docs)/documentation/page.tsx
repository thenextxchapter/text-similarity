import { FC } from 'react'
import LargeHeading from '@/ui/LargeHeading'
import Paragraph from '@/ui/Paragraph'
import DocumentationTabs from '@/components/DocumentationTabs'

import type { Metadata } from 'next'
import 'simplebar-react/dist/simplebar.min.css'

export const metadata: Metadata = {
  title: "Similarity API | Documentation",
  description:
    "Similarity API is a free API that allows you to compare two pieces of text and get a similarity score.",
};

const page: FC = () => {
    return <div className='container max-w-7xl mx-auto mt-12'>
        <div className='flex flex-col items-center gap-6'>
            <LargeHeading>Making a request</LargeHeading>
            <Paragraph>api/v1/similarity</Paragraph>

            <DocumentationTabs />
        </div>
    </div>
}

export default page