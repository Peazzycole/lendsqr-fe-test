import Lottie from 'lottie-react'
import squareLoader from '../../../assets/Square Loader.json'
export default function Loading() {
    return (
        <Lottie
            animationData={squareLoader}
            loop
            style={{ height: '300px', width: '300px' }}
        />
    )
}
