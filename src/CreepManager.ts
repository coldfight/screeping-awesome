import { HarvesterCreep } from "creep-roles/harvester-creep";

const HARVESTER_1 = "Harvester1";
const HARVESTER_2 = "Harvester2";
const SPAWN_1 = "Spawn1";

export class CreepManager {
  private spawn: StructureSpawn;
  private harvesterCreeps: HarvesterCreep[];

  constructor() {
    this.spawn = Game.spawns[SPAWN_1];
    this.harvesterCreeps = [];
  }

  public setup(): void {
    if (this.shouldSpawnHarvester(HARVESTER_1)) {
      this.spawnHarvester(HARVESTER_1);
    }

    if (this.shouldSpawnHarvester(HARVESTER_2)) {
      this.spawnHarvester(HARVESTER_2);
    }

    for (const creepName in Game.creeps) {
      const creep = Game.creeps[creepName];
      this.harvesterCreeps.push(new HarvesterCreep(this.spawn, creep));
    }
  }

  public run(): void {
    console.log(`harvesterCreep length ${this.harvesterCreeps.length}`);
    for (const harvesterCreep of this.harvesterCreeps) {
      harvesterCreep.run();
    }
  }

  /**
   * Checks to see if the creep exists or not.
   *
   * @param creepName The name of the creep to check
   * @returns Whether or not the creep exists
   */
  private shouldSpawnHarvester(creepName: string): boolean {
    return !Game.creeps[creepName];
  }

  /**
   * Create a new harvester creep.
   *
   * @param spawn The spawn object to spawn a creep
   * @param creepName The name of the new screep you're creating
   */
  private spawnHarvester(creepName: string): void {
    console.log(`> Spawning Harvester: ${creepName}`);
    this.spawn.spawnCreep([WORK, CARRY, MOVE], creepName);
  }
}
