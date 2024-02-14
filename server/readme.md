## Installation

1. Install and configure virtual environment

   ```
   pip install virtualenv
   virtualenv venv
   ```

2. To activate virtualenv

   ```
   source venv/bin/activate
   ```

3. To deactivate virtualenv

   ```
   deadeactivate
   ```

4. Install the required dependencies by running the following command:

   ```
   pip install -r requirements.txt
   ```

5. Obtain an API key from OpenAI and add it to the `.env` file in the project directory.

   ```
      OPENAI_API_KEY=your_secrit_api_key
   ```

6. Run the `main.py` file using the Streamlit CLI. Execute the following command:
   ```
   streamlit run app.py
   ```
