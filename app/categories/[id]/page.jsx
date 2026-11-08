import Detail from "@/components/Detail";
export default function CategoryDetails({ params }) { return <Detail path="/categories" id={params.id} param="category" />; }
