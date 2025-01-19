export function Spinner() {
	return (
		<div className={'w-full h-full flex justify-center items-center'}>
			<div
				className={
					'inline-block animate-spin rounded-full border-2 border-solid border-current border-r-transparent h-10 w-10'
				}
				role="status"
				aria-label="loading"
			/>
		</div>
	);
}
