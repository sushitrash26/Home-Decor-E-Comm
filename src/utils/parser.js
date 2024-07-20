import { useToast } from "@/components/ui/use-toast"

const parser = (error)=>{
  const { toast } = useToast()
    const parser = new DOMParser();
        const htmlDocument = parser.parseFromString(error.response.data, 'text/html');
        const preElement = htmlDocument.querySelector('pre');
        const errorMessage = preElement.innerHTML.split('<br>')[0];
       return (
         toast({
          title: "Failed !",
          description: errorMessage,
        })
    )
}
export default parser