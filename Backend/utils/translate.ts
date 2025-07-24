import { Translate } from "@google-cloud/translate/build/src/v2";

const translate = new Translate()

export async function getTranslations(text: string, fromLang: string): Promise<{ en: string, ta: string }>{
    try{
        let [ translatedToEN ] = await translate.translate(text, 'en')
        let [ translatedToTA ] = await translate.translate(text, 'ta')

        return { en: fromLang === 'en' ? text: translatedToEN, ta: fromLang === 'ta' ? text : translatedToTA }
    }
    catch(err: any){
        console.log(`Error in Translating - ${err.message}`)
        return { en: text, ta: text }
    }
}