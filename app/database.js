const database = new localStorageDB('feedback', localStorage);

if( database.isNew() ) {
    database.createTable('invite', [
        'start',
        'finish',
        'name',
        'positive1',
        'positive2',
        'positive3',
        'negative1',
        'negative2',
        'negative3'
    ]);

    database.commit();
}

window.database = database;

export default database;