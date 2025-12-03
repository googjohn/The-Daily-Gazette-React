import { Skeleton } from "@heroui/skeleton";
import { generateSkeletonElements } from "./generateSkeletonUtility";

export function WeatherAppSkeleton() {
  return (
    <div className="block h-full w-full sm:min-w-80 relative bg-[var(--gray-30)] px-1 rounded-lg">
      <div>
        <Skeleton className="min-w-full w-full min-h-full rounded-lg bg-[var(--gray-30)]" />
      </div>
      <div className="flex gap-1.5 place-items-center absolute w-full px-1 top-0 right-0 bottom-0 left-0 m-auto">
        <Skeleton className="w-8/12 h-4 rounded-md bg-[var(--gray-20)]" />
        <Skeleton className="aspect-square w-6 rounded-sm bg-[var(--gray-20)]" />
        <Skeleton className="w-2/12 h-4 rounded-md bg-[var(--gray-20)]" />
        <Skeleton className="w-1/12 h-4 rounded-md bg-[var(--gray-20)]" />
      </div>
    </div>
  )
}
export function NewsSkeleton({ len }) {
  const elements = generateSkeletonElements(len, (
    <CommonSkeleton />
  ))
  return (
    <>
      {elements}
    </>
  )
}

export function GameSchedulesSkeleton() {
  const elements = generateSkeletonElements(6, (
    <div className="flex-col [&>*]:basis-1 flex sm:flex-row sm:[&>*]:basis-1/2">
      <FrameSkeleton />
      <FrameSkeleton />
    </div>
  ))
  return (
    <>
      {elements}
    </>
  )
}

export function StandingsSkeleton() {
  const elements = generateSkeletonElements(15, (
    <div className="h-auto w-full relative bg-[var(--gray-30)]">
      <div className="flex place-items-center gap-1.5 px-2.5 py-3 border-b border-[var(--gray-20)]">
        <Skeleton className="rounded-full w-8 aspect-square  bg-[var(--gray-20)]" />
        <Skeleton className="rounded-lg basis-3/12 h-4 w-full bg-[var(--gray-20)]" />
        <div className="w-full flex justify-end">
          <Skeleton className="rounded-lg basis-8/12 h-4 w-full bg-[var(--gray-20)]" />
        </div>
      </div>
    </div>
  ))
  return (
    <>
      {elements}
    </>
  )
}

export function PlayersSkeleton() {
  const elements = generateSkeletonElements(20, (
    <div className="w-28 h-40 flex flex-col gap-1 shadow-[var(--bs-cards)] p-1 rounded-lg overflow-hidden">
      <div className="block basis-1/2 w-full h-full">
        <Skeleton className="rounded-sm h-full w-full bg-[var(--gray-30)]" />
      </div>
      <div className="basis-1/2 relative">
        <Skeleton className="rounded-sm h-full w-full bg-[var(--gray-20)]" />
        <div className="flex flex-col justify-center items-center gap-1 w-full h-full absolute top-0 bottom-0 right-0 left-0 m-auto">
          <Skeleton className="rounded-sm h-3 w-8/12 bg-[var(--gray-30)]" />
          <Skeleton className="rounded-sm h-3 w-8/12 bg-[var(--gray-30)]" />
          <div className="flex gap-1 items-center w-8/12">
            <Skeleton className="rounded-full h-4 aspect-square bg-[var(--gray-30)]" />
            <Skeleton className="rounded-sm h-3 w-full bg-[var(--gray-30)]" />
          </div>
        </div>
      </div>
    </div>
  ))
  return (
    <>
      {elements}
    </>
  )
}

export function SportsSubframeSkeleton() {
  const elements = generateSkeletonElements(3, (
    <FrameSkeleton />
  ))
  return (
    <>
      {elements}
    </>
  )
}

export function AsideSkeleton() {
  const elements = generateSkeletonElements(9, (
    <div className="max-w-[500px] w-full flex items-center gap-3 shadow-(--bs-cards)">
      <div>
        <Skeleton className="flex rounded-full w-[74px] h-[74px] m-[5px] bg-[var(--gray-30)]" />
      </div>
      <div className="w-full flex flex-col gap-2" >
        <Skeleton className="h-3 w-10/12 rounded-lg bg-[var(--gray-30)]" />
        <Skeleton className="h-3 w-10/12 rounded-lg bg-[var(--gray-30)]" />
        <Skeleton className="h-3 w-8/12 rounded-lg bg-[var(--gray-30)]" />
      </div>
    </div>
  ))
  return (
    <>
      {elements}
    </>
  )
}

function FrameSkeleton() {
  return (
    <div className="max-w-[500px] w-full flex flex-col py-1 px-1.5 border border-[var(--gray-20)]">
      <div className="w-full h-4 place-items-center flex items-center justify-center">
        <Skeleton className="h-3 w-4/12 rounded-lg bg-[var(--gray-30)]" />
      </div>
      <div className="w-full flex items-center">
        <div className="flex flex-col h-20 justify-center basis-2/3">
          <div className="flex flex-col gap-[2px]">

            <div className="flex gap-2.5 items-center w-full">
              <div>
                <Skeleton className="rounded-full w-[24px] aspect-square bg-[var(--gray-30)]" />
              </div>
              <div className="block w-full">
                <Skeleton className="h-3 w-6/12 rounded-lg bg-[var(--gray-30)]" />
              </div>
            </div>
            <div className="flex gap-2.5 items-center w-full">
              <div>
                <Skeleton className="rounded-full w-[24px] h-[24px] bg-[var(--gray-30)]" />
              </div>
              <div className="block w-full">
                <Skeleton className="h-3 w-6/12 rounded-lg bg-[var(--gray-30)]" />
              </div>
            </div>
          </div>
        </div>
        <div className="basis-1/3 w-full flex flex-col gap-1">
          <div className="block w-full place-items-center">
            <Skeleton className="h-3 w-8/12 rounded-lg bg-[var(--gray-30)]" />
          </div>
          <div className="block w-full place-items-center">
            <Skeleton className="h-3 w-6/12 rounded-lg bg-[var(--gray-30)]" />
          </div>
        </div>
      </div>
    </div>
  )
}

function CommonSkeleton() {
  return (
    <div className="w-full flex flex-col items-center gap-2.5 p-2.5 shadow-(--bs-cards) relative">
      <div className="block w-full h-full">
        <Skeleton className="rounded-lg min-w-full w-full h-full bg-[var(--gray-30)]" />
      </div>
      <div className="block w-full absolute bottom-5 px-5">
        <div className="w-full flex flex-col gap-2" >
          <Skeleton className="h-3 w-6/12 rounded-lg bg-[var(--gray-20)]" />
          <Skeleton className="h-3 w-10/12 rounded-lg bg-[var(--gray-20)]" />
        </div>
      </div>
    </div>
  )
}