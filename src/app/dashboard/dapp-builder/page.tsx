import MotionTerminal from '@/components/dapp-builder/motion-terminal';

export default function DappBuilderPage() {
  return (
    <div className="w-full h-full flex flex-col">
      <div className="mb-4">
        <h1 className="text-3xl font-bold font-headline">dApp Builder</h1>
        <p className="text-muted-foreground">
          Watch the automated build process or start your own project.
        </p>
      </div>
      <div className="flex-grow rounded-lg overflow-hidden">
        <MotionTerminal />
      </div>
    </div>
  );
}
