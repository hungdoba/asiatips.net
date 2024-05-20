interface NumberBoxProps {
  number: number;
}

function NumberBox({ number }: NumberBoxProps) {
  return (
    <h3 className="min-w-6 h-6 px-1 mr-2 flex justify-center align-middle items-center border border-black">
      {number}
    </h3>
  );
}

export default NumberBox;
