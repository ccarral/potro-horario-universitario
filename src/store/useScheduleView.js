import { defineStore } from 'pinia';
import { ScheduleView } from "../lib/gridUtils";
import { useEngineResults } from "./useEngineResults";
import { usePoolStore } from "./usePools";

export const useScheduleView = defineStore('schedule-view', {
    state: () => ({ currentResultIdx: 0 }),
    actions: {
        setCurrentResultIdx(idx) {
            this.currentResultIdx = idx;
        },
        decCurrentResultIdx() {
            if (this.currentResultIdx > 0) {
                this.currentResultIdx--;
            }
        },
        incCurrentResultIdx() {
            let engineResults = useEngineResults();
            if (this.currentResultIdx < engineResults.results.length - 1) {
                this.currentResultIdx++;
            }
        }
    },
    getters: {
        scheduleView: (state) => {
            let scheduleView = new ScheduleView();
            let engineResults = useEngineResults();
            if (engineResults.engineRan && engineResults.engineResults.length > 0) {
                const currentResult = engineResults.engineResults[state.currentResultIdx];
                for (const grid of currentResult.grids) {
                    scheduleView.pushGrid(grid, grid.data.nombre);
                }
            } else {
                // Usar solo los horarios definidos en los engineParams
                let poolStore = usePoolStore();
                for (const grid of poolStore.selectedGroups) {
                    scheduleView.pushGrid(grid, grid.data.nombre);
                }
            }
            return scheduleView;
        }

    }

});
