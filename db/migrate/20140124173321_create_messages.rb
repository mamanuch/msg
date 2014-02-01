class CreateMessages < ActiveRecord::Migration
  def change
    create_table :messages do |t|
     
      t.string :status
      t.string :from
      t.string :subject
      t.string :text  
      
      t.timestamps
    end
  end
end
