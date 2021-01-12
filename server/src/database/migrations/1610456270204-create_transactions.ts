import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createTransactions1610456270204 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable( new Table({
            name: "transactions",
            columns: [  
                {
                    name: "id",
                    type: "int",
                    unsigned: true,
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment'
                },
                {
                    name: "stock",
                    type: "string",
                },
                {
                    name: "stockName",
                    type: "string"
                },
                {
                    name: "amount",
                    type: "int"
                },
                {
                    name: "price",
                    type: "int"
                },
                {
                    name: "type",
                    type: "string"
                },
                {
                    name: 'user_id',
                    type: 'int'
                }
            ],    
            foreignKeys: [
                {
                    name: 'userId',
                    columnNames: ['user_id'], // nome da coluna que vai possuir o relacionamento
                    referencedTableName: 'users', // tabela com qual está se relacionando 
                    referencedColumnNames: ['id'], // dentro da tabela de users com qual coluna vai estar se relacionando
                    onUpdate: 'CASCADE', // caso o id do orfanato tenha sido atualizado ele vai alterar o id dele em todas as imagens que possuirem o relacionamento
                    onDelete: 'CASCADE' // caso o orfanato seja deleto as imagens também serão
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

    }

}
