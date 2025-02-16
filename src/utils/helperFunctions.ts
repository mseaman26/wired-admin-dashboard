
import { FilterFormInterface } from "../interfaces/FilterFormInterface";

interface BuildQueryStringInterface {
    formData: FilterFormInterface;
    setQueryString: (queryString: string) => void;
}
//function for creating query string for downloads search filters and sorting parameters
export const buildDownloadsQueryString = ({formData, setQueryString}: BuildQueryStringInterface): void => {
    //validate form data
    //create query string
    const params = new URLSearchParams();
    if (formData.searchBy && formData.searchQuery){
      params.append(formData.searchBy, formData.searchQuery);
    }
    const sortMapping: Record<string, { sort_by: string; sort_dir: 'ASC' | 'DESC' }> = {
      date_asc: { sort_by: 'date', sort_dir: 'ASC' },
      date_desc: { sort_by: 'date', sort_dir: 'DESC' },
      module_asc: { sort_by: 'module', sort_dir: 'ASC' },
      module_desc: { sort_by: 'module', sort_dir: 'DESC' },
      package_asc: { sort_by: 'package', sort_dir: 'ASC' },
      package_desc: { sort_by: 'package', sort_dir: 'DESC' }
    };

    if (formData.sort in sortMapping) {
      const { sort_by, sort_dir } = sortMapping[formData.sort as keyof typeof sortMapping];
      params.append('sort_by', sort_by);
      params.append('sort_dir', sort_dir);
    }
    //if module_id is provided in parms
    if (formData.module_id) params.append('module_id', formData.module_id.toString());
    if (formData.startDate) params.append('start_date', formData.startDate.toString());
    if (formData.endDate) params.append('end_date', formData.endDate.toString());
    if (formData.searchBy){
      //this if/else ensures that only one of the two searchBy options is used
      if(formData.searchBy === 'module'){
        params.append('module_name', formData.searchQuery);
      }else if(formData.searchBy === 'package'){
        params.append('package_name', formData.searchQuery);
      }
    }
    if (formData.latitude && formData.longitude){
      params.append('latitude', formData.latitude.toString());
      params.append('longitude', formData.longitude.toString());
      if(formData.distance){
        params.append('distance', formData.distance.toString());
      }
    }

    setQueryString(params.toString());
  };

  export const packageNames = [
    "A Package",
    "Best Package",
    "Cool Package"
  ]
  export const moduleNames = [
    "101 CHW Overview of the CHW Program",
    "Acne",
    "Acquired Immunodeficiency Syndrome",
    "Acute Bronchitis",
    "Adenoidectomy ",
    "Adenoids",
    "ADHD",
    "AIDS",
    "Air Pollution",
    "Airborne Diseases",
    "Alcohol - Quitting Alcohol for Health",
    "Alcohol and substance abuse",
    "Allergy",
    "Alternative Medicine: Introduction",
    "Alzheimer's disease",
    "Anatomía y Enfermedad Fundamentos—Parte 1 (Modulo Expreso) (Spanish)",
    "Anatomía y Enfermedad Fundamentos—Parte 2 (Modulo Expreso) (Spanish)",
    "Anatomía y Enfermedad Fundamentos—Parte 3 (Modulo Expreso) (Spanish)",
    "Anatomy & Illness Fundamentals—Part 1 (Express module)",
    "Anatomy & Illness Fundamentals—Part 2 (Express module)",
    "Anatomy & Illness Fundamentals—Part 3 (Express module)",
    "Anemia",
    "Anemia (Sickle Cell)",
    "Anemia for Community Health Workers",
    "Antidepressants",
    "Antihypertensive Medicines",
    "Antiretroviral therapy for adults and children",
    "Anxiety",
    "Aortic Stenosis",
    "Arachnoiditis",
    "Arthritis",
    "Aseptic Meningitis",
    "Asthma",
    "Astigmatism",
    "Athlete's Foot",
    "Attention Deficit Hyperactivity Disorder",
    "Autoimmune Diseases, Introduction",
    "Baby Blues",
    "Baby Care",
    "Baby Health Checkup",
    "Back Pain",
    "Bee Stings",
    "Before Pregnancy, Introduction to",
    "Benign Prostatic Hyperplasia",
    "Binge Drinking",
    "Biosand filters",
    "Bipolar Disorder",
    "Birth Control",
    "Birth Defects",
    "Bladder Cancer - Part 1",
    "Bladder Cancer - Part 2",
    "Bladder Infections",
    "Bleeding Disorders",
    "Blood Cells",
    "Blood Clots",
    "Blood Disorders",
    "Blood Pressure",
    "Blood Pressure Medicines",
    "BMI",
    "Body Weight",
    "Botanicals",
    "Bowel Movement",
    "Brain Attack",
    "Brain tumors - Part 1",
    "Brain tumors - Part 2",
    "Breast Cancer",
    "Breast cancer - Part 1",
    "Breast cancer - Part 2",
    "Breast cancer - Part 3",
    "Breast cancer - Part 4",
    "Breast Feeding",
    "Broken Bones",
    "Bronchial Asthma",
    "Bronchitis",
    "Bronchopneumonia",
    "Burns",
    "CAM",
    "Cancer",
    "Cáncer de Ovario (Modulo Expreso) (Spanish)",
    "Cáncer de Próstata (Modulo Expreso) (Spanish)",
    "Cancer: Breast",
    "Candidiasis",
    "Cervical cancer - Part 1",
    "Cervical cancer - Part 2",
    "Colorectal cancer - Part 1",
    "Colorectal cancer - Part 2",
    "Diarrhea, dehydration and ORT",
    "Eye problems",
    "Family planning",
    "First Aid: Bites and stings",
    "First Aid: Burns",
    "First Aid: Fractures",
    "Fungal infections",
    "High blood pressure (hypertension)",
    "HIV/AIDS: Basic information",
    "HIV/AIDS: Caring for someone with AIDS at home",
    "Hodgkin Lymphoma - Part 1",
    "Hodgkin Lymphoma - Part 2",
    "Infant feeding",
    "Infant health",
    "Introduction to Cancer - Part 1",
    "Introduction to Cancer - Part 2",
    "Introduction to Cancer - Part 3",
    "Kidney (Renal) Cancer",
    "Lung cancer",
    "Maternal health and postnatal care",
    "Meningitis",
    "Mental Health: Depression",
    "Obesity",
    "Ovarian Cancer (Express module)",
    "Pain",
    "Pancreatic cancer",
    "Pneumonia",
    "Prostate Cancer (Express Module)",
    "Rheumatic Heart Disease Training Series",
    "Seminar in anxiety disorders",
    "Seminar in attention deficit hyperactivity disorder (ADHD)",
    "Seminar in bipolar disorder",
    "Sickle Cell Disease",
    "Stroke",
    "Upper respiratory tract infection",
    "Upper respiratory tract infection; Ear, nose and throat (ENT)",
    "Urinary tract infections",
    "Women's Health: Blood disorders",
    "Women's Health: Cancer",
    "Women's Health: Skin and hair health"
  ];
  