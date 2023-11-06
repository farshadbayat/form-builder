export type RelationEventType = 'selected' | 'unselected' | 'hover' | 'leave' | 'relation-added';
export class RelationEvent {

  constructor(public type?: RelationEventType, public name?: string) {
  }

  extractName(): {fromTable: string, fromField: string, toTable: string, toField: string} {
    const names = {fromTable: '', fromField: '', toTable: '', toField: ''};
    const tables = this.name?.split('-');
    if(!tables){
      return names;
    }
    if(tables.length >= 1) {
      const from = tables[0].split('.');
      names.fromTable = from[0];
      names.fromField = from[1];
    }
    if(tables.length >= 2) {
      const to = tables[1].split('.');
      names.toTable = to[0];
      names.toField = to[1];
    }
    return names;
  }
}
