import { notFound } from "next/navigation";
import { treatments } from "../../../data/treatments";
import TreatmentDetailClient from "../../../components/treatment/TreatmentDetailClient";

export async function generateStaticParams() {
  return treatments.map((t) => ({
    slug: t.slug,
  }));
}

export async function generateMetadata({ params }) {
  const treatment = treatments.find((t) => t.slug === params.slug);

  if (!treatment) {
    return {
      title: "Treatment Not Found | Truly Derma",
    };
  }

  return {
    title: `${treatment.name} in Delhi | Truly Derma Clinic & Academy`,
    description: `${treatment.name}: ${treatment.tagline}. Performed by Dr. Megha Aggarwal at Truly Derma (Pitampura & Rajouri Garden, New Delhi).`,
    openGraph: {
      title: `${treatment.name} | Truly Derma Clinic`,
      description: treatment.description,
      images: [treatment.heroImage],
    },
  };
}

export default function TreatmentPage({ params }) {
  const treatment = treatments.find((t) => t.slug === params.slug);

  if (!treatment) {
    notFound();
  }

  const relatedTreatments = treatments
    .filter((t) => t.slug !== treatment.slug)
    .slice(0, 3);

  return (
    <TreatmentDetailClient
      treatment={treatment}
      relatedTreatments={relatedTreatments}
    />
  );
}
