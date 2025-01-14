import { BackButton } from "../BackButton"
import Heading from "../HeadingComponent/Heading"

export const NotFoundBoardSection = () => {
    return (
        <div className="w-full h-full flex flex-col justify-center items-center my-5 py-4 gap-2">
            <Heading
                title="It looks like you entered wrong board"
                variant="h1"
                extraStyles="font-medium normal-case"
            />
            <p className="text-base text-gray-600">Please try again by entering correct board code.</p>
            <BackButton text="Go Back" />
        </div>
    )
}
