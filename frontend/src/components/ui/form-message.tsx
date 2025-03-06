interface Props {
  message: string | undefined;
}
const FormMessage = ({ message }: Props) => {
  return <p className="text-red-500 text-sm pt-2 pl-3">{message}</p>;
};
export { FormMessage };
