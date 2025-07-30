import { t } from 'i18next'
import Steps from '../../../components/Steps'


const data = [
    {
        labelKey: "howItWorks.step1_label",
        titleKey: "howItWorks.step1_title",
        descriptionKey: "howItWorks.step1_description",
        image: "/howItsWorks.png",
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
    }
]

function HowItWorks() {
    return (
        <div className='pb-10 md:pb-12'>
            <div className="max-w-7xl mx-auto text-center my-10 md:mt-20 px-5">
                <h2 className="text-4xl sm:text-5xl font-extrabold text-primary-text mb-4">
                    {t("howItWorks.title")}
                </h2>
                <p className="text-lg text-2ndcolor-text max-w-[300px] md:max-w-xl mx-auto">
                    {t("howItWorks.subtitle")}
                </p>
            </div>
            {data.map((stp, i) => <Steps key={i} {...stp} />)}
        </div>
    )
}

export default HowItWorks
