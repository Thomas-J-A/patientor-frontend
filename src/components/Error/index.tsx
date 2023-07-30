export interface ErrorProps {
  msg: string;
}

const Error = ({ msg }: ErrorProps) => {
  return <p>{msg}</p>;
};

export default Error;
