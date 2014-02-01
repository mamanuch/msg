class MessagesController < ApplicationController
  before_action :set_message, only: [:show, :edit, :update, :destroy]
  #skip_before_filter  :verify_authenticity_token
  # GET /messages
  # GET /messages.json
   #def index
  #  @messages = Message.all
  # end
  
      def index
      @messages = Message.all

      if params[:checkpoint]    
        @last = Message.count       
        @num = params[:checkpoint].to_i
        @rest = @last - @num
        @extra = @num - @last       
        if @rest < 0
          
          if  -10 < @rest 
            @messag = Message.first(10 - @extra)
            @messages = @messag.sort {|vn1, vn2| vn2[:created_at] <=> vn1[:created_at]} 
          else
            @messages = null        
          end
          
        else
          @messag = Message.all.limit(10).offset(@rest)
          @messages = @messag.sort {|vn1, vn2| vn2[:created_at] <=> vn1[:created_at]}      
        end      
      end
      end

  
  
  # GET /messages/1
  # GET /messages/1.json
  def show
  end

  # GET /messages/new
  def new
    @message = Message.new
  end

  # GET /messages/1/edit
  def edit
  end

  # POST /messages
  # POST /messages.json
  def create
    @message = Message.new(message_params)

    respond_to do |format|
      if @message.save
        format.html { redirect_to @message, notice: 'Message was successfully created.' }
        format.json { render action: 'show', status: :created, location: @message }
      else
        format.html { render action: 'new' }
        format.json { render json: @message.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /messages/1
  # PATCH/PUT /messages/1.json
  def update
    respond_to do |format|
      if @message.update(message_params)
        format.html { redirect_to @message, notice: 'Message was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: 'edit' }
        format.json { render json: @message.errors, status: :unprocessable_entity }
      end
    end
  end
  
  
  # DELETE /messages/1
  # DELETE /messages/1.json
  def destroy
    @message.destroy
    respond_to do |format|
      format.html { redirect_to messages_url }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_message
      @message = Message.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.     params.fetch(:message, {})
    def message_params
      
      params.require(:message).permit(:status, :from, :subject, :text, :created_at)
    end
end
