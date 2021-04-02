import { BaseCreep } from "./base-creep";

export class HarvesterCreep extends BaseCreep {
  constructor(spawn: StructureSpawn, creep: Creep) {
    super(spawn, creep);
  }
  public run(): void {
    if (this.shouldTransferEnergyToSpawn()) {
      this.transferEnergyToSpawn();
    } else {
      this.harvestEnergy();
    }
  }

  /**
   * If the creep is not in range of an energy source, it will move to it.
   * And if it is in range, it will harvest the source's energy.
   */
  private harvestEnergy(): void {
    const sources = this.creep.room.find(FIND_SOURCES);
    if (this.creep.harvest(sources[0]) === ERR_NOT_IN_RANGE) {
      console.log(`> Moving '${this.creep.name}' to source to harvest energy`);
      this.creep.moveTo(sources[0]);
    } else {
      console.log(`> '${this.creep.name}' is harvesting energy`);
    }
  }

  /**
   * Checks to see if the creep is at max capacity, and returns whether or not it
   * should be returning to the spawn to transfer the harvested energy.
   *
   * @returns Whether or not to transfer harvested energy back to spawn
   */
  private shouldTransferEnergyToSpawn(): boolean {
    return this.creep.store.getFreeCapacity() <= 0;
  }

  /**
   * If the creep is not in range of the spawn structure, it will move
   * to it, otherwise it will transfer harvested energy to it.
   */
  private transferEnergyToSpawn(): void {
    if (this.creep.transfer(this.spawn, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
      console.log(`> Moving '${this.creep.name}' to spawn '${this.spawn.name}'`);

      this.creep.moveTo(this.spawn);
    } else {
      console.log(`> '${this.creep.name}' transferring energy to to spawn '${this.spawn.name}'`);
    }
  }
}
