
import Steps from '../../../components/Steps'
import { useTranslation } from 'react-i18next';


const data = [
    {
        labelKey: "howItWorks.step1_label",
        titleKey: "howItWorks.step1_title",
        descriptionKey: "howItWorks.step1_description",
        image: "/step1.jpg",
        imageAltKey: "howItWorks.image_alt"
    },
    {
        labelKey: "howItWorks.step2_label",
        titleKey: "howItWorks.step2_title",
        descriptionKey: "howItWorks.step2_description",
        image: "/step2.png",
        imageAltKey: "howItWorks.step2_alt",
        reverse: true
    },
    {
        labelKey: "howItWorks.step3_label",
        titleKey: "howItWorks.step3_title",
        descriptionKey: "howItWorks.step3_description",
        image: "/step3.png",
        imageAltKey: "howItWorks.step3_alt"
    },
    {
        labelKey: "howItWorks.step4_label",
        titleKey: "howItWorks.step4_title",
        descriptionKey: "howItWorks.step4_description",
        image: "/step4.png",
        imageAltKey: "howItWorks.step4_alt",
        reverse: true
    },
    {
        labelKey: "howItWorks.step5_label",
        titleKey: "howItWorks.step5_title",
        descriptionKey: "howItWorks.step5_description",
        image: "/step5.png",
        imageAltKey: "howItWorks.step5_alt",
    }
]

function HowItWorks() {
    const { t } = useTranslation()
    return (
        <div className='pb-10 md:pb-12 flex flex-col items-center justify-center'>
            <div className="max-w-7xl flex text-center my-10 md:mt-20 px-5 items-center justify-center">
                <h2 className="text-4xl sm:text-5xl font-extrabold text-primary-text max-w-3xl ">
                    {t("howItWorks.titleSection")}
                </h2>
            </div>
            {data.map((stp, i) => <Steps key={i} {...stp} />)}
        </div>
    )
}

export default HowItWorks
