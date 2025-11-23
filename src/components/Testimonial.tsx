import React from 'react';
import Titles from './Titles';
import { BookUserIcon } from 'lucide-react';

const Testimonials: React.FC = () => { 
    return (
        <div id='testimonials' className="flex flex-col items-center justify-center py-20 px-6 md:px-12 lg:px-24 bg-white">
            <div className="flex items-center gap-2 text-sm text-green-800 bg-green-400/10 border border-green-200 rounded-full px-4 py-1">
                <BookUserIcon className="w-5 h-5 text-green-600" aria-hidden="true" />
                <span>Testimonials</span>
            </div>
            <div className="mt-10">  </div>
            <Titles content={{ title: "Dont Just Take Our words", description: "Our Users Say that ITS THE BEST RESUME BUILDER" }}></Titles>
        </div>
    )
}


export default Testimonials;