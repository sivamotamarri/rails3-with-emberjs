class AddColsToEmp < ActiveRecord::Migration
  def self.up
    add_column :employees,:education_level,:string
    add_column :employees ,:university , :string
    add_column :employees,:work_experience , :string
    add_column :employees ,:skills, :string
  end
  def self.down
    remove_column :employees ,:education_level
    remove_column :employees ,:university
    remove_column :employees ,:work_experience
    remove_column :employees, :skills
  end
end
