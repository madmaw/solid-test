export function UnicodeSceneryComponent(props: {
  unicode: string,
  fontSize: string,
}) {
  return (
    <div style={{ 'font-size': props.fontSize }}>
      {props.unicode}
    </div>
  );
}