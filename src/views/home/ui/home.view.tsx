'use client'

import { NavigationList } from "@/entities/navigation.list";
import { IStartPreviewInfo, StartPreview } from "@/entities/studio.preview";
import { FC } from "react";  

interface HomeViewProps {
  
  studioInfo: IStartPreviewInfo

}
 
export const HomeView: FC<HomeViewProps> = ({ studioInfo }) => {

  return (

    <section>

      <StartPreview href = { '/studio' }  info = { studioInfo }/>

      <NavigationList />  

    </section>  

  );
  
}
 