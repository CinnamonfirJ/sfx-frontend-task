interface PageHeaderProps {
  title: string;
  description?: string;
}

export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div className='space-y-2 mb-6'>
      <h1 className='font-bold text-2xl lg:text-3xl text-gray-900'>{title}</h1>
      {description && (
        <p className='text-gray-500 text-sm lg:text-base'>{description}</p>
      )}
    </div>
  );
}
