class Employee < ActiveRecord::Base
  validates :first_name,:last_name,:city,:age, :presence => true
  validates :age, :numericality => { :only_integer => true ,:greater_than => 0, :less_than_or_equal_to => 100}
end
