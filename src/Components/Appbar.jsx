export const Appbar = ({label , username , firstletter}) => {
    return <div className="shadow-md h-14 flex justify-between">
        <div className="flex flex-col justify-center h-full ml-4 font-medium text-green-600 text-4xl">
            {label}
        </div>
        <div className="flex">
            <div className="flex flex-col justify-center h-full mr-4">
                {username}
            </div>
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    {firstletter}
                </div>
            </div>
        </div>
    </div>
}