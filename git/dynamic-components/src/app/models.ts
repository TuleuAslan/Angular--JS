import { TabComponent } from "./components/tab/tab.component";

export interface ITab {
    label: string;
    isOpened: boolean;
    component: TabComponent;
}