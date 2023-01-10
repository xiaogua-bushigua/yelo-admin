import cl from './Card.module.scss';

interface propsType {
  title: string;
  content: string;
  borderBottom?: number
}

const Card = (props: propsType) => {
	return (
		<div className={cl.cardWrap} style={{borderRadius: `10px 10px ${props.borderBottom} ${props.borderBottom}`}}>
      <div className={cl.contentWrap}>
        <div className={cl.title}>{props.title}</div>
        <div className={cl.content}>{props.content}</div>
      </div>
			<div className={cl.area}>
				<ul className={cl.circles}>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
				</ul>
			</div>
		</div>
	);
};

export default Card;
