class CreatePuzzles < ActiveRecord::Migration
  def change
    create_table :puzzles do |t|
      t.string :author
      t.string :title
      t.string :status

      t.timestamps null: false
    end
  end
end
